
class BaseDto {

    id: string;
    name: string;

    constructor(data: any) {
        this.id = data._id;
        this.name = data.name;
    }

}

export default BaseDto