import { expect, test } from "bun:test"
import isEven from './calc';

 test("returns true if number is even", () => {
   expect(isEven(3)).toBe(true);
 });
