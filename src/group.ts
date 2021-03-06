/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Group
 */

import { Token } from "@brontosaurus/web";
import * as React from "react";
import { withBrontosaurus } from "./connect";
import { BrontosaurusProps, WithAuthComponent } from "./declare";

export type EnableForGroupProp = {

    readonly group: string[];
    readonly placeholder?: any;
    readonly validation?: (token: Token | null) => boolean;
    readonly visit?: boolean;

    readonly children?: any;
} & BrontosaurusProps;

export const EnableForGroupBase: React.ComponentType<EnableForGroupProp> = (props: EnableForGroupProp) => {

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
            return props.group.reduce((previous: boolean, group: string) => {
                if (!previous) {
                    return false;
                }
                return groups.includes(group);
            }, true);
        })();

        return valid ? props.children : placeholder;
    }

    if (props.visit) {

        return placeholder;
    }

    throw new Error('[Brontosaurus-React] Invalid Token');
};

export const EnableForGroup: WithAuthComponent<EnableForGroupProp> = withBrontosaurus(EnableForGroupBase);
