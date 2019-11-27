/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description One Of
 */

import { Token } from "@brontosaurus/web";
import * as React from "react";
import { withBrontosaurus } from "./connect";
import { BrontosaurusProps, WithAuthComponent } from "./declare";

export type EnableForOneOfGroupProp = {

    readonly group: string[];
    readonly placeholder?: any;
    readonly validation?: (token: Token | null) => boolean;
    readonly visit?: boolean;

    readonly children?: any;
} & BrontosaurusProps;

export const EnableForOneOfGroupBase: React.ComponentType<EnableForOneOfGroupProp> = (props: EnableForOneOfGroupProp) => {

    const token: Token | null = Boolean(props.visit)
        ? props.auth.visit()
        : props.auth.strict();
    const placeholder: any = props.placeholder || null;

    if (props.validation) {

        if (!props.validation(token)) {
            return placeholder;
        }
    }

    if (token && token.groups) {

        const groups: string[] = token.groups;

        const valid: boolean = (() => {
            return props.group.some((value: string) => groups.includes(value));
        })();

        return valid ? props.children : placeholder;
    }

    if (props.visit) {

        return placeholder;
    }

    throw new Error('[Brontosaurus-React] Invalid Token');
};

export const EnableForOneOfGroup: WithAuthComponent<EnableForOneOfGroupProp> = withBrontosaurus(EnableForOneOfGroupBase);
