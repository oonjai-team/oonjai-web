import { expect, test, describe } from "bun:test";
import { APIResponse, ResponseType } from "./service/APIResponse";
import { env } from "./env";

describe("Foundation Logic", () => {
  test("Environment variables are loaded", () => {
    // This ensures your env.ts logic is working
    expect(env.SERVICE_URL).toBeDefined();
    expect(env.NEXT_PUBLIC_ALLOWED_SERVICE_VERSION).toContain(">");
  });

  test("APIResponse success state", () => {
    const mockData = { id: 1, name: "Gemini" };
    const response = new APIResponse<typeof mockData>().success("Loaded", mockData);
    
    expect(response.type).toBe(ResponseType.SUCCESS);
    expect(response.getPayload()).toEqual(mockData);
  });

  test("APIResponse error state", () => {
    const response = new APIResponse().error("Mobile network failure");
    
    expect(response.type).toBe(ResponseType.ERROR);
    expect(response.isSuccess()).toBe(false);
  });
});