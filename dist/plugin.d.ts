/// <reference types="node" />
import { Transform } from 'stream';
import { IconType } from 'fa-minify';
export declare function plugin(usedIcons: {
    [type in IconType]?: string[];
}): Transform;
