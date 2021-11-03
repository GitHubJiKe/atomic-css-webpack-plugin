
type TConfig = {
    atomic: Record<string, Object>,
    utils: Record<string, Object>,
}

interface IAtomicCSSWebpackPluginOptions {
    /** config file path; required */
    config: string;
    /** support webpack version;default is 4 */
    version?: 5 | 4 | '5' | '4';
    /** css assets path, effectived when importWay equals 'link' */
    assets?: string;
    /** css import way; default is inline */
    importWay?: "link" | "inline";
    /** custom parser function; default is null */
    parser?: (config: TConfig) => string;
}

declare class AtomicCSSWebpackPlugin {
    options?: IAtomicCSSWebpackPluginOptions;
    constructor(options: IAtomicCSSWebpackPluginOptions);
}

export = AtomicCSSWebpackPlugin;
