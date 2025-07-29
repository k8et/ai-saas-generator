/** @type {import("prettier").Config} */
module.exports = {
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindFunctions: ["cn", "cva", "clsx"],
    printWidth: 100,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: "es5",
}
