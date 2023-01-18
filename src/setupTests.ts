import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

afterEach(() => {
  nock.cleanAll();
  nock.enableNetConnect();
  localStorage.removeItem("jwt");
});
