import * as React from "react";

// -----------------------------
// COMPARISON TOOL -------------
// -----------------------------
export interface IComparisonToolProps {
    width: number;
    height: number;
    onCTDragStart?: () => void;
    onCTMove?: (position: number) => void;
    onCTDragEnd?: (position: number) => void;
}

export declare class ComparisonTool extends React.Component<IComparisonToolProps, any>{

    showComparisonTool(activeSide: string, imageSrc: string, position: number): void;
    hideComparisonTool(): void;

    constructor(props: IComparisonToolProps);
    setState(state: any, callback?: () => void): void;
    forceUpdate(callBack?: () => void): void;
    render(): React.ReactNode;
    props: Readonly<{ children?: React.ReactNode }> & Readonly<IComparisonToolProps>;
    state: Readonly<any>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance
    };
}

// -----------------------------
// TILE INSPECTOR --------------------
// -----------------------------

export interface ITIEngineContainerSize {
    width: number;
    height: number;
}

export interface ITIEngineContainerParams {
    apiEndpoint: string;
    apiToken: string;

    tenantId: string;

    autoRot: boolean;
    initAngle: number;
    tileOrientation: string;
    bgColor: string;
    defaultThickness: number;

    cubemapTextures?: string[];

    onEngineReady?: (engine: ITIEngineContainer) => void;
    onInitializationError?: (error: Error) => void;
}

export interface ITIEngineContainerProps extends ITIEngineContainerSize, ITIEngineContainerParams {

}

export interface ITIEngineContainer {
    executeCommand(command: ICommand);
    canExecuteCommand(command: ICommand): boolean;
}

export declare class TIEngineContainer extends React.Component<ITIEngineContainerProps, any> implements ITIEngineContainer {
    executeCommand(command: ICommand);
    canExecuteCommand(command: ICommand): boolean;

    constructor(props: ITIEngineContainerProps);
    setState(state: any, callback?: () => void): void;
    forceUpdate(callBack?: () => void): void;
    render(): React.ReactNode;
    props: Readonly<{ children?: React.ReactNode }> & Readonly<ITIEngineContainerProps>;
    state: Readonly<any>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance
    };
}

// -----------------------------
// TI COMMANDS --------------------
// -----------------------------

export declare class LoadExternalTileCommand implements ICommand {
    readonly type: CommandsEnum;
    constructor(tile: RR3Tile);
}



// -----------------------------
// ENGINE CONTAINER ------------
// -----------------------------

export interface IEngineContainerSize {
    width: number;
    height: number;
}

export interface AIConfig {
    maxImageDimension: number;
    segmentationEndpoint: string;
    onlyFloor: boolean;
    defaultShading: number;
    defaultReflection: number;
}

export interface IEngineContainerParams {
    engineId?: string;

    apiToken: string;
    catalogueApiEndpoint: string; //for patterns
    aiConfig: AIConfig;

    resourceManager: IResourceManager;
    unitOfMeasurement: UNITS;

    cubemapTextures?: string[];

    tenantId: string;

    selectionColor?: number;

    defaultMaterials?: DefaultMaterials;

    gizmoConfig?: GizmoConfig;

    selectableLayers?: SurfaceType[];

    multipleHotspots?: boolean;
    minHotspotDistance?: number;

    detailedEvents?: boolean;
    disableStats?: boolean;
    showStats?: boolean;

    onEngineReady?: (engine: IEngineContainer) => void;
    onInitializationError?: (error: Error) => void;
    onCommandEnd?: (commandName: string, withError: string, params?: any) => void;
}

export enum GizmoPosition {
    OUTSIDE,
    INSIDE
}

export interface GizmoConfig {
    gizmoRotationEnabled?: boolean;
    gizmoType?: string;
    autoReposition?: boolean;
    nArrow?: number;
    rotateOusideCanvas?: boolean;
    tapArea?: number;
    scaleFactor?: number;
    position?: GizmoPosition;
    centerPositionChanged?: (vec: Vec3) => void;
}

export interface DefaultMaterials {
    defaultFloor: MaterialKey;
    defaultWall: MaterialKey;
}

export interface MaterialKey {
    manuf: string;
    name: string;
}

export interface IEngineContainerProps extends IEngineContainerSize, IEngineContainerParams {

}

export interface IEngineContainer {
    executeCommand(command: ICommand);
    canExecuteCommand(command: ICommand): boolean;
}

export declare class EngineContainer extends React.Component<IEngineContainerProps, any> implements IEngineContainer {

    executeCommand(command: ICommand): void;
    canExecuteCommand(command: ICommand): boolean;
    setUserInteraction(enabled: boolean);

    constructor(props: IEngineContainerProps, context?: any);
    setState(state: any, callback?: () => void): void;
    forceUpdate(callBack?: () => void): void;
    render(): React.ReactNode;
    props: Readonly<{ children?: React.ReactNode }> & Readonly<IEngineContainerProps>;
    state: Readonly<any>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance
    };
}

// -----------------------------
// VIGNETTE ENGINE CONTAINER ---
// -----------------------------

export declare class VignetteContainer extends React.Component<IVignetteContainerProps, any> implements IVignetteContainer {

    executeCommand(command: ICommand): void;
    canExecuteCommand(command: ICommand): boolean;

    constructor(props: IVignetteContainerProps, context?: any);
    setState(state: any, callback?: () => void): void;
    forceUpdate(callBack?: () => void): void;
    render(): React.ReactNode;
    props: Readonly<{ children?: React.ReactNode }> & Readonly<IVignetteContainerProps>;
    state: Readonly<any>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance
    };
}

export interface IVignetteContainerParams {
    apiEndpoint: string;
    apiToken: string;

    tenantId: string;

    backgroundColor?: number;
    groutEnhancedColor?: number;

    minVignetteWidth: number;
    minVignetteHeight: number;

    resourceManager: IVignetteResourceManager;

    onEngineReady?: (engine: IVignetteContainer) => void;
    onInitializationError?: (error: Error) => void;
}

export interface IVignetteContainerProps extends IEngineContainerSize, IVignetteContainerParams {

}

export interface IVignetteContainer {
    executeCommand(command: ICommand);
    canExecuteCommand(command: ICommand): boolean;
}

export interface IVignetteResourceManager {
    showActivityIndicator(nBlockingTask: number, nNonBlockingTask: number);
}

// -----------------------------
// VIGNETTE COMMANDS -----------
// -----------------------------

export declare class LoadTileVignetteCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly tiles: RR3Tile[];
    readonly patternId: string;
    constructor(tiles: RR3Tile[], patternId: string);
}

export declare class LoadRugVignetteCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly rug: RR3Rug;
    constructor(rug: RR3Rug);
}

export declare class LoadCorridorVignetteCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly corridor: RR3Corridor;
    constructor(corridor: RR3Corridor);
}

export declare class LoadBroadloomVignetteCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly broadloom: RR3Broadloom;
    constructor(broadloom: RR3Broadloom);
}

export declare class DownloadVignetteImageCommand implements ICommand {
    readonly type: CommandsEnum;
    constructor(preview: boolean, onImageReady: (imageData: string) => void);
}



// -----------------------------
// COMMANDS --------------------
// -----------------------------
export interface ICommand {
    readonly type: CommandsEnum;
}

export enum CommandsEnum {
    LoadExternalProject,
    ApplyPattern,
    ChangeGrout,
    ChangeGroutColor,
    ChangePatternRotation,
    SaveImage,
    ExportProject,
    ToggleLightAnimation,
    SetSelectedLayer,
    ChangeMaterial,
    AddBackgroundImage,
    CalcSegmentation,
    CalcSegmentationRug,
    AddRug,
    ApplyPatternExt,
    ApplyTilePatternToSurface,
    ApplyPatternsToSurfaces,
    AddCorridor,
    RemoveCorridor,
    CalcSegmentationCorridor,

    LoadExternalTile,

    LoadTileVignette,
    LoadRugVignette,
    LoadCorridorVignette,
    LoadBroadloomVignette,
    DownloadVignetteImage,

    EditRug,
    GetSceneRugImage
}

export interface ScreenshotConfig {
    test: string;
    maxWidth: number;
    maxHeight: number;
    name: string;
    watermarkUrl: string;
    watermarkWidth: number;
    watermarkPosition: string;
    watermarkMargin: number;
    watermarkOpacity: number;
}

export declare class LoadExternalProjectCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly serializedProject: string;
    readonly version: number
    constructor(serializedProject: string, version?: number);
}

export declare class ApplyPatternCommand implements ICommand {
    public type: CommandsEnum;
    constructor(patternID: string);
}

export declare class ChangeGroutCommand implements ICommand {
    public type: CommandsEnum;
    constructor(groutSize: number);
}

export declare class ChangeGroutColorCommand implements ICommand {
    public type: CommandsEnum;
    constructor(groutColor: number);
}

export declare class ChangePatternRotationCommand implements ICommand {
    public type: CommandsEnum;
    constructor(rotationDegree: number);
}

export declare class SaveImageCommand implements ICommand {
    readonly type: CommandsEnum;
    constructor(screenshotConfig: ScreenshotConfig, download: boolean);
}

export declare class ExportProjectCommand implements ICommand {
    readonly type: CommandsEnum;

    /**
     * @param removeBase64Images Set it to false to save a scene that can be reload
     * @param download true: download the json file of the scene, false: return the strigified scene data
     */
    constructor(removeBase64Images: boolean, download: boolean);
}

export declare class ToggleLightAnimationCommand implements ICommand {
    public type: CommandsEnum;
}

export declare class SetSelectedLayerCommand implements ICommand {
    public type: CommandsEnum;
    constructor(surfaceType: SurfaceType, surfaceIndex: number);
}

export declare class ChangeMaterialCommand implements ICommand {
    public type: CommandsEnum;
    constructor(tileIds: RR3TileKey[], tiles: RR3Tile[], pattern?: string);
}

export declare class AddBackgroundImageCommand implements ICommand {
    public type: CommandsEnum;
    constructor(imageFile: File | string, imageAspect?: number);
}

export declare class CalcSegmentationCommand implements ICommand {
    public type: CommandsEnum;
    constructor(imageFile: File, wallsVisible?: boolean);
}

export declare class CalcSegmentationRugCommand implements ICommand {
    public type: CommandsEnum;
    constructor(imageFile: File, rug: RR3Rug);
}

export declare class ApplyTilePatternToSurfaceCommand implements ICommand {
    readonly type: CommandsEnum;
    constructor(surfaceType: SurfaceType, surfaceIndex: number, tileKeys: ITileKey[], patternID: string, groutColor: number, groutSize: number, patternRotation: number);
}

export declare class AddRugCommand implements ICommand {
    readonly type: CommandsEnum;
    /**
     * The rug is added over the existing floor and placed in the floor hotspot
     * @param rug Rug data
     * @param replaceExisting True: replace the current rug (if only one rug is in the scene) also if the rug is not selected
     *                        False: add a new rug
     */
    constructor(rug: RR3Rug, replaceExisting: boolean);
}

export declare class ApplyPatternExtCommand implements ICommand {
    public type: CommandsEnum;
    constructor(pattern: string, tiles: RR3Tile[], groutSize: number, rotation: number);
}

export declare class CalcSegmentationCorridorCommand implements ICommand {
    public type: CommandsEnum;
    constructor(imageFile: File, rug: RR3Corridor, tiles?: RR3Tile[], pattern?: string);
}

export declare class AddCorridorCommand implements ICommand {
    readonly type: CommandsEnum;
    constructor(corridor: RR3Corridor);
}

export declare class RemoveCorridorCommand implements ICommand {
    readonly type: CommandsEnum;
    constructor();
}

export declare class EditRugCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly gizmoCenter: Vec3;
    constructor(gizmoCenter?: Vec3);
}

export declare class GetSceneRugImageCommand implements ICommand {
    readonly type: CommandsEnum;
    readonly rugs: RR3Rug[];
    readonly size: Vec2;
    constructor(rugs: RR3Rug[], size: Vec2, onImageReady: (imageData: string[]) => void)
}

// -----------------------------
// QUANTITY --------------------
// -----------------------------
export enum UNITS {
    // LENGTH
    MM = 1,
    CM = 2,
    M = 3,
    IN = 4,
    FT = 5,

    // AREA
    MM2 = 6,
    CM2 = 7,
    M2 = 8,
    IN2 = 9,
    FT2 = 10
}

// -----------------------------
// MATH ------------------------
// -----------------------------
export interface Vec2 {
    x: number;
    y: number;
}

export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

export interface Box2 {
    min: Vec2;
    max: Vec2;
}

// -----------------------------
// RESOURCE MANAGER-------------
// -----------------------------
export interface IResourceManager {
    showMessageCallout(messageType: MessageType, messageCode: string);
    showActivityIndicator(nBlockingTask: number, nNonBlockingTask: number);
    setSelectedLayer(surfaceType: SurfaceType, surfaceIndex: number, eventType?: string);

    setHotspot?(id: string, posX: number, posY: number, surfaceType: SurfaceType, surfaceIndex: number, patternInfo?: PatternInfo);
    setMultipleHotspot?(id: string, surfaceType: SurfaceType, surfaceIndex: number, hotspots: HotspotInfo[]);

    userInteractionStart?();
    userInteractionEnd?();
}

export interface PatternInfo {
    surfaceType: SurfaceType;
    surfaceIndex: number;
    tiles: ITileKey[];
    pattern: string;
    rotation: number; //deg
    groutSize: number;
    groutColor: number;
    id?: string;
    formatSize?: string;
}

export interface HotspotInfo {
    point: Vec2;
    tileKey: ITileKey;
}

export interface ITileKey {
    code?: string;
    manufacturer?: string;
    color?: string;
    tileNum?: number;
}

// -------------------------------------------------------
// MESSAGES ----------------------------------------------
// -------------------------------------------------------

export enum MessageType {
    INFO = 1 << 0,
    ERROR = 1 << 1,
    WARNING = 1 << 2,
    SUCCESS = 1 << 3
}

export enum MessageCode {
    GENERIC_ERROR = "GENERIC_ERROR",
    DROP_OUTSIDE = "DROP_OUTSIDE",
    TILE_INVALID_SURFACE = "TILE_INVALID_SURFACE",
    TILE_WRONG_FORMAT = "TILE_WRONG_FORMAT",
    TILE_WALL_ONLY = "TILE_WALL_ONLY",
    TILE_FLOOR_ONLY = "TILE_FLOOR_ONLY",
    PATTERN_INVALID_SURFACE = "PATTERN_INVALID_SURFACE",
    PATTERN_CONSTRAINTS_VIOLATION = "PATTERN_CONSTRAINTS_VIOLATION",
    PATTERN_NOT_SUPPORTED = "PATTERN_NOT_SUPPORTED",
    CONNECTION_ERROR = "CONNECTION_ERROR",
    NO_SELECTED_OBJECT = "NO_SELECTED_OBJECT",
    WRONG_NODE_TYPE = "WRONG_NODE_TYPE",
    NOTHING_TO_EXTEND = "NOTHING_TO_EXTEND",
    SELECT_DRAG_DROP_TILE = "SELECT_DRAG_DROP_TILE",
    NO_FLOOR_DETECTED = "NO_FLOOR_DETECTED"
}

// -------------------------------------------------------
// RR3 PROJECT -------------------------------------------
// -------------------------------------------------------
export enum SurfaceType {
    FLOOR = 0,
    WALL = 1,
    BACKSPLASH = 2,
    RUG = 3,
    HPLANE = 4,
    CORRIDOR = 5
}

export enum SceneType {
    STATIC = 0,
    CUSTOM = 1
}

export class RR3Project {
    sceneId: string;
    version: number;
    backgroundImage: BackgroundImage;
    cameraParams: CameraParams;
    maskList: RR3Mask[];
    layers: RR3Layer[];
    tiles: RR3Tile[];
    lights: RR3Light[];
    rugs?: RR3RugLayer[];
    prjData?: RR3PrjData;
    corridor?: RR3CorridorLayer;
    type: SceneType;
}

export interface CameraParams {
    fov: number;
    grade: number;
    roll: number;
    heightFromGround: number;
    imageAspect: number;
}

export interface ARData {
    gridPoints: Vec2[];
    alignPoints: Vec2[];
    rotation: number;
}

export interface RR3PrjData {
    cameraRotation: number; //rad
    alignPlaneHeight: number;
    hPlanesData: HPlaneData[];
}

export interface HPlaneData {
    surfaceIndex: number;
    rotation: number; //rad
    heightFromGround: number;
}

export interface BackgroundImage {
    src: string;
    size: Vec2;
}

export interface RR3Mask {
    id: string;
    src: string;
    indexes: number[];
    reflection: number;
    shading: number;
    contour2d: Vec2[][][];
}

export class RR3Layer {
    surfaceType: string;
    surfaceIndex: number;
    hotspot: Vec2;
    points: Vec3[];
    tileList: RR3TileList[];
    arData?: ARData;
}

export class RR3RugLayer {
    surfaceIndex: number;
    rugData: RR3Rug;
    position: Vec3;
    rotation: number; //degree
}

export interface RR3TileList {
    fillPolicy: DTTileListFlags;
    patterns: RR3PatternData[];
}

export interface RR3PatternData {
    pattern: RR3Pattern;
    tiles: RR3TileKey[];
}

export interface RR3Pattern {
    id: string;
    groutSize: number;
    groutColor: number; //hex
    rotation: number; //degrees
    origin?: Vec2;
    areaRect?: Box2;
    //delta?: Vec3;
}

export interface RR3TileKey {
    idProduct: string;
    idManuf: string;
    tileIndex: number;
}

export interface RR3Tile {
    idProduct: string;
    idManuf: string;
    formatType: string;
    width: number;
    height: number;
    diagonal: number;
    thickness?: number;
    offshaded: boolean;
    offshadedRot: boolean;
    material: RR3Material;
    borderMaterial?: RR3Material;
}

export class RR3CorridorLayer {
    surfaceIndex: number;
    position: Vec3;
    rotation: number; //degree
    corridorData: RR3Corridor;
}

export class RR3Corridor {
    id: string;
    width: number;      //corridor width - mm
    height: number;     //repeatable height - mm
    mapUrl: string;     //texture url
}

export interface RR3Material {
    dominantColor?: number;
    color?: number;
    maps: string[];
    alphaMaps?: string[];
    bumpMaps?: string[];
    bumpScale?: number;
    displacementMaps?: string[];
    displacementScale?: number;
    displacementBias?: number;
    emissive?: number;
    emissiveIntensity?: number;
    metalness?: number;
    metalnessMaps?: string[];
    normalMaps?: string[];
    normalScale?: Vec2;
    opacity?: number;
    refractionRatio?: number;
    roughness?: number;
    roughnessMaps?: string[];
}

export interface RR3Light {
    lightType: DTLightTypeEnum;
    pnt: Vec3;
    power: number;
    targetPnt?: Vec3;
    angle?: number;
    penumbra?: number;
    areaType?: DTLightAreaType;
    areaDim1?: number;
    areaDim2?: number;
    animationPositions?: Vec3[];
}

export interface RR3Rug {
    id: string;
    shape?: string;         // RECT, ROUND, FLAT (png)
    width?: number;         //mm
    height?: number;        //mm
    thickness?: number;     //mm
    mapUrl: string;
    mapWidth?: number;
    mapHeight?: number;
    objModelUrl?: string;
}

export class RR3Broadloom {
    id: string;
    idManuf: string;
    width: number;      //repeatable width
    height: number;     //repeatable height
    thickness?: number;
    halfDrop: boolean;
    mapUrl: string;
    dominantColor?: number;
}

export enum DTTileListFlags {
    Full = 1,       //fill the poligon
    Horizontal = 2, //fill width
    Vertical = 3,   //fill/free height
    Custom = 4,     //freeform
    Single = 5,     //single tile
    Frame = 6
}

export enum DTLightTypeEnum {
    Ambient = 1,
    Spot = 2,
    Omni = 3
}

export enum DTLightAreaType {
    None = 0,
    Rect = 1,
    Disc = 2,
    Sphere = 3,
    Cylinder = 4
}