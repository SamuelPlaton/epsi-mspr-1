import { storiesOf } from "@storybook/vue";

storiesOf("Card", module).add("default", () => {
    return {
        template: `
    <Card/>
    `
    };
});