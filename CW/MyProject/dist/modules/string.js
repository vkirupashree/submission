"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
// src/modules/string.ts
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}