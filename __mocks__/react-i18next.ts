// This is a common mock that mocks all i18next usage through react-i18next
// Copied from here https://github.com/i18next/react-i18next/blob/master/example/test-jest/src/__mocks__/react-i18next.js and then converted into Typescript
const React = require("react");
const reactI18next = require("react-i18next");

const hasChildren = (node) =>
  node && (node.children || (node.props && node.props.children));

const getChildren = (node) =>
  node && node.children ? node.children : node.props && node.props.children;

const renderNodes = (reactNodes) => {
  if (typeof reactNodes === "string") {
    return reactNodes;
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key];
    const isElement = React.isValidElement(child);

    if (typeof child === "string") {
      return child;
    }
    if (hasChildren(child)) {
      const inner = renderNodes(getChildren(child));
      return React.cloneElement(child, { ...child.props, key: i }, inner);
    }
    if (typeof child === "object" && !isElement) {
      return Object.keys(child).reduce(
        (str, childKey) => `${str}${child[childKey]}`,
        ""
      );
    }

    return child;
  });
};

const useMock = {
  t: (k) => k,
  i18n: {},
};

module.exports = {
  // Removed withTranslation mock because it made no sense and its not being used
  Trans: ({ children }) =>
    Array.isArray(children) ? renderNodes(children) : renderNodes([children]),
  Translation: ({ children }) => children((k) => k, { i18n: {} }),
  useTranslation: () => useMock,

  // mock if needed
  I18nextProvider: reactI18next.I18nextProvider,
  initReactI18next: reactI18next.initReactI18next,
  setDefaults: reactI18next.setDefaults,
  getDefaults: reactI18next.getDefaults,
  setI18n: reactI18next.setI18n,
  getI18n: reactI18next.getI18n,
};
