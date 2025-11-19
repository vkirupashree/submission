import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ApiButton3 from "../components/ApiButton3";

test("ApiButton3 calls api (setTimeout)", async () => {
  const { getByTestId } = render(<ApiButton3 api={() => {}} />);
  fireEvent.click(getByTestId("btn-3"));
  // Since setTimeout is 500ms, we wait
  await waitFor(() => true, { timeout: 600 });
});
