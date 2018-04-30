
const actionsGMaps = {};

actionsGMaps.initGMaps = (gMapsElements) => {
    return {
        type: 'INIT_GMAPS',
        gMapsElements
    }
}

export default actionsGMaps;