import { AIConfig, ScreenshotConfig, SurfaceType } from "realityremod-engine";

export interface CoreConfig {
    engineApiEndpoint: string;
    catalogueCoreEndpoint: string;
    tenantId: string;
    aiConfig?: AIConfig;
    token: string;
    screenshotConfig?: ScreenshotConfig;
}


export interface HotspotObj {
    //from engine
    id: string;
    x: number;
    y: number;
    surfaceType: SurfaceType;
    surfaceIndex: number;

    //for your GUI, as an example
    selected: boolean;
}
