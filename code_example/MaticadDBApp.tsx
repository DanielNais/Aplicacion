import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import {
    UNITS, LoadExternalProjectCommand, MessageType, SurfaceType,
    IResourceManager, EngineContainer, ComparisonTool, ApplyTilePatternToSurfaceCommand, ITileKey, ApplyPatternCommand
} from "realityremod-engine";
import { DefultProject } from "./data/DefaultProject";
import { CoreConfig, HotspotObj } from "./ExtUtils";


//============================= RESOURCE MANAGER =========================================
export class ResourceManagerProps {
    onSetHotspot?: (id: string, screenX: number, screenY: number, surfaceType: SurfaceType, surfaceIndex: number) => void;
    setSelectedLayer?: (surfaceType: SurfaceType, surfaceIndex: number) => void;
}

export class ResourceManagerState {
    messageCalloutVisible: boolean;
    activityIndicatorVisible: boolean;
}

export class ResourceManager extends React.Component<ResourceManagerProps, ResourceManagerState> implements IResourceManager {

    constructor(props) {
        super(props);

        this.state = {
            messageCalloutVisible: false,
            activityIndicatorVisible: false
        }
    }

    showMessageCallout(messageType: MessageType, messageCode: string) {
        console.log("messageType: " + messageType + " - messageCode: " + messageCode);
        this.setState({ messageCalloutVisible: true });
    }
    showActivityIndicator(nBlockingTask: number, nNonBlockingTask: number) {
        if (nBlockingTask > 0)
            this.setState({ activityIndicatorVisible: true });
        else
            this.setState({ activityIndicatorVisible: false });
    }
    setSelectedLayer(surfaceType: SurfaceType, surfaceIndex: number) {
        if (this.props.setSelectedLayer)
            this.props.setSelectedLayer(surfaceType, surfaceIndex);
    }
    setHotspot?(id: string, posX: number, posY: number, surfaceType: SurfaceType, surfaceIndex: number) {
        this.props.onSetHotspot(id, posX, posY, surfaceType, surfaceIndex);
    }

    public render(): JSX.Element {
        return (
            <div>
                {/* TODO: activity indicator UI*/}

                {/*TODO: message callout UI*/}
            </div>
        )
    }
}


//============================= TEST APP =========================================
interface MaticadDBAppState {
    engineWidth: number;
    engineHeight: number;

    activeSurfaceType: SurfaceType;
    activeSurfaceIndex: number;

    hotspots: Map<string, HotspotObj>;
}

export interface MaticadDBAppProps {

}

export class MaticadDBApp extends React.Component<MaticadDBAppProps, MaticadDBAppState>{
    private engine: EngineContainer;
    private resourceManager: IResourceManager;
    private comparisonTool: ComparisonTool;

    private config: CoreConfig;

    constructor(props: MaticadDBAppProps) {
        super(props);

        this.state = {
            engineWidth: 1024, //SET THE ENGINE DIMENSION DEPENDING ON YOUR PAGE
            engineHeight: 768, //SET THE ENGINE DIMENSION DEPENDING ON YOUR PAGE
            activeSurfaceType: null,
            activeSurfaceIndex: -1,
            hotspots: new Map<string, HotspotObj>()
        }

        this.config = {
            engineApiEndpoint: "",
            catalogueCoreEndpoint: "https://catd3dwebcore.maticad.com", // DEV URL
            aiConfig: {
                maxImageDimension: 2048,
                segmentationEndpoint: "https://rrgenius.maticad.com",
                onlyFloor: true,
                defaultShading: 1.0,
                defaultReflection: 1.0
            },
            tenantId: "EQUIPE", //YOUR TENANT ID

            //TOKEN CREATED ON THE SERVER
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cDp0aWQiOiJFUVVJUEUiLCJ0cDpnaWQiOiIwIiwidHA6dWlkIjoiMCIsInRwOm14cCI6IjAiLCJ0cDp1c3IiOiIwIiwiZXhwIjoxNzEzNTE2NTgyfQ.R8LG1zcH9zQO_C76pu0YvaqS1Ik1b7HrzzSV7EKepEI'
        }
    }

    private setEngineContainerRef = (el: EngineContainer) => {
        this.engine = el;
    }

    private setResourceManagerRef = (el: ResourceManager) => {
        if (!this.resourceManager) {
            this.resourceManager = el;
            this.forceUpdate(); // Needed to render the EngineContainer, which is rendered only when resourceManager is not null
        }
    }

    private setComparisonToolRef = (el: ComparisonTool) => {
        this.comparisonTool = el;
    }

    private loadProject = () => {
        const projectData = JSON.stringify(DefultProject.project);
        this.engine.executeCommand(new LoadExternalProjectCommand(projectData));
    }

    //SET HOTSPOT DATA
    private setHotspot = (id: string, screenX: number, screenY: number, surfaceType: SurfaceType, surfaceIndex: number) => {
        const selected = (surfaceType === this.state.activeSurfaceType && surfaceIndex === this.state.activeSurfaceIndex);

        const h: HotspotObj = {
            id: id,
            x: screenX,
            y: screenY,
            surfaceType: surfaceType,
            surfaceIndex: surfaceIndex,
            selected: selected
        };

        this.setState(prevState => ({
            hotspots: prevState.hotspots.set(id, h)
        }), () => {
            this.forceUpdate();
        });
    }
    
    private setSelectedLayer = (surfaceType: SurfaceType, surfaceIndex: number) => {
        this.setState({ activeSurfaceType: surfaceType, activeSurfaceIndex: surfaceIndex });
    }

    //SINGLE TILE PATTERN
    private applyTile = () => {
        const tileKey: ITileKey = {
            code: "24461",
            manufacturer: "EQUIPE",
            color: "0"
        }

        this.engine.executeCommand(new ApplyTilePatternToSurfaceCommand(this.state.activeSurfaceType,
            this.state.activeSurfaceIndex, [tileKey], "pieno_02", 0xff0000, 3, 0));
    }

    //MULTI TILE PATTERN
    private applyTile2 = () => {
        const tileKey: ITileKey = {
            code: "24461",
            manufacturer: "EQUIPE",
            color: "0"
        }

        const tileKey2: ITileKey = {
            code: "24460",
            manufacturer: "EQUIPE",
            color: "0"
        }
        
        this.engine.executeCommand(new ApplyTilePatternToSurfaceCommand(this.state.activeSurfaceType,
            this.state.activeSurfaceIndex, [tileKey, tileKey2], "scacco_01", 0xff0000, 1, 0));
    }

    private changePattern = () => {
        this.engine.executeCommand(new ApplyPatternCommand("pieno_03"));
    }

    public render(): JSX.Element {

        return (
            <div>
                {/* ----------------- HOST PAGE UI */}
                <div style={{ display: 'flex' }}>
                    Host page
                    <PrimaryButton
                        text={"Load Project"}
                        onClick={this.loadProject}
                        style={{ marginLeft: '10px' }}
                    />
                    <PrimaryButton
                        text={"Apply Tile"}
                        onClick={this.applyTile}
                        style={{ marginLeft: '10px' }}
                    />

                    <PrimaryButton
                        text={"Apply Tile 2"}
                        onClick={this.applyTile2}
                        style={{ marginLeft: '10px' }}
                    />

                    <PrimaryButton
                        text={"Change pattern"}
                        onClick={this.changePattern}
                        style={{ marginLeft: '10px' }}
                    />
                </div>


                {/* ----------------- */}

                {this.resourceManager !== null &&

                    <div style={{ position: 'relative' }}>
                        <ResourceManager
                            ref={this.setResourceManagerRef}
                            onSetHotspot={this.setHotspot}
                            setSelectedLayer={this.setSelectedLayer}
                        />

                        <ComparisonTool
                            ref={this.setComparisonToolRef}
                            width={this.state.engineWidth}
                            height={this.state.engineHeight}
                        >

                            <EngineContainer
                                ref={this.setEngineContainerRef}
                                resourceManager={this.resourceManager}
                                width={this.state.engineWidth}
                                height={this.state.engineHeight}
                                catalogueApiEndpoint={this.config.catalogueCoreEndpoint}
                                apiToken={this.config.token}
                                unitOfMeasurement={UNITS.MM}
                                aiConfig={this.config.aiConfig}
                                tenantId={"EQUIPE"}
                            />

                        </ComparisonTool>

                        {Array.from(this.state.hotspots.values()).map((hotspot: any) =>

                            /*TODO: replace with hotspot UI. Set css position based on hotspot screenX and screenY values*/
                            <div key={hotspot.id} style={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: hotspot.selected ? 'green' : 'yellow',
                                position: 'absolute',
                                top: (hotspot.y - 30 / 2) + 'px',
                                left: (hotspot.x - 30 / 2) + 'px',
                                borderRadius: '20px'
                            }}>
                            </div>
                        )}

                    </div>
                }

                {/* ----------------- HOST PAGE UI */}
                <div>
                    Host page
                </div>

                {/* ----------------- */}


            </div>
        )
    }
}






