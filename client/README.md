# 8seconds

![preview](https://github.com/williamselaine/8seconds/raw/main/assets/8seconds_1.gif)

A generative AI 4-track mixer powered by [fal.ai musicgen](!https://fal.ai/models/musicgen/api).

https://github.com/williamselaine/8seconds/assets/159915306/9ef035af-0753-4476-95aa-b64f99dd4d34

## [Try it here!](https://williamselaine.github.io/8seconds/)
- Enter prompts to generate up to four tracks, 8 seconds each
- Mix them to your liking
- Listen in your browser or download the wav file to keep working in the DAW of your choice
- I have like $9.75 balance left in my fal account, go nuts until it runs out 😵



https://github.com/williamselaine/8seconds/assets/159915306/40b75645-2b21-49b4-9709-fef74af9ae9f



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
