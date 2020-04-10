import axios from "axios";

export default axios.create({
  baseURL: "https://koodihaaste.solidabis.com/reittiopas.json"
});