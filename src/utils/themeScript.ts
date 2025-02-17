// export function themeScript() {
//   return `
//     (function() {
//       let theme = localStorage.getItem("theme");
//       if (!theme) {
//         theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//       }
//       if (theme === "dark") {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     })();
//   `;
// }
