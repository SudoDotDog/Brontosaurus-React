/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description None
 */

import { Token } from "@brontosaurus/web";
import * as React from "react";
import { withBrontosaurus } from "./connect";
import { BrontosaurusProps, WithAuthComponent } from "./declare";

export type EnableNoneOfGroupProp = {

    readonly group: string[];
    readonly placeholder?: any;
    readonly validation?: (token: Token | null) => boolean;
    readonly visit?: boolean;

    readonly children?: any;
} & BrontosaurusProps;

export const EnableNoneOfGroupBase: React.ComponentType<EnableNoneOfGroupProp> = (props: EnableNoneOfGroupProp) => {

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

        const valid: boolean = token.hasNoGroups(...props.group);

        return valid ? props.children : placeholder;
    }

    if (props.visit) {

        return placeholder;
    }

    throw new Error('[Brontosaurus-React] Invalid Token');
};

export const EnableNoneOfGroup: WithAuthComponent<EnableNoneOfGroupProp> = withBrontosaurus(EnableNoneOfGroupBase);
