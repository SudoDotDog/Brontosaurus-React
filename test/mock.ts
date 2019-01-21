/**
 * @author WMXPY
 * @namespace Hook
 * @description Mock
 */

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const registerEnzyme = (): void => {

    configure({
        adapter: new Adapter(),
    });
};

registerEnzyme();
