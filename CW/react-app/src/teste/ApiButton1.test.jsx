import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ApiButton1 from "../components/ApiButton1";

test("ApiButton1 calls api (Promise)", async () => {
  const mockApi = jest.fn(() => Promise.resolve("API 1 is called"));
  const { getByTestId } = render(<ApiButton1 api={mockApi} />);
  fireEvent.click(getByTestId("btn-1"));
  await waitFor(() => expect(mockApi).toHaveBeenCalled());
});
