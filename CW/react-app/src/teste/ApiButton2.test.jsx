import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ApiButton2 from "../components/ApiButton2";

test("ApiButton2 calls api (async/await)", async () => {
  const mockApi = jest.fn(async () => "API 2 is called");
  const { getByTestId } = render(<ApiButton2 api={mockApi} />);
  fireEvent.click(getByTestId("btn-2"));
  await waitFor(() => expect(mockApi).toHaveBeenCalled());
});
