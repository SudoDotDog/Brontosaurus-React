/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Mock
 * @package Mock
 */

import * as React from "react";

export const MockComponent: React.SFC<Record<string, any>> = (props: Record<string, any>) =>
    <React.Fragment>{props.children}</React.Fragment>;
