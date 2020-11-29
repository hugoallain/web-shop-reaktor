import axios from 'axios';

class Common {
    // Find and return object in a JSON object by its id
    static filterById(jsonObject, id) {
        return jsonObject.filter(function (jsonObject) {
            return jsonObject['id'] === id;
        })[0];
    }

    // Generate axios request for each manufacturer
    static generateRequestsManufacturers(arrayManu, arrayRequests) {
        for (let i = 0; i < arrayManu.length; i++) {
            arrayRequests.push(
                axios.get(
                    'https://bad-api-assignment.reaktor.com/availability/' +
                        arrayManu[i]
                )
            );
        }
    }

    // Get all manufacturer of an item collection
    static getManufactuer(arrayManu, clothesCollection) {
        for (let i = 0; i < clothesCollection.length; i++) {
            if (!arrayManu.includes(clothesCollection[i].manufacturer)) {
                arrayManu.push(clothesCollection[i].manufacturer);
            }
        }
    }

    // Get the availability of an item in a JSON Object.
    // Remove the tags and space of this value to get a clean string.
    static getAvailabilityItem(
        availibityItem,
        manufacturerJacket,
        idJacket,
        mapManufacturersItems,
        clothesCollection
    ) {
        availibityItem = mapManufacturersItems
            .get(manufacturerJacket)
            .find((o) => o.id.toLowerCase() === idJacket)
            .DATAPAYLOAD.replace(/(<([^>]+)>)/g, '')
            .replace(' ', '')
            .toLowerCase();
        this.filterById(
            clothesCollection,
            idJacket
        ).availability = availibityItem;
    }
}

export default Common;
