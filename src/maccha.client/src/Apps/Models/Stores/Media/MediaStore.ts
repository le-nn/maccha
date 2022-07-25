import { MediaRepositry } from "Apps/Repositories/MediaRepository";
import { Message, State, FluxStore, meta } from "memento.core";

class MediaStoreState extends State<MediaStoreState> {

}

@meta({ name: "MediaStore" })
export class MediaStore extends FluxStore<MediaStoreState> {
    constructor(
        private readonly repository: MediaRepositry
    ) {
        super(new MediaStoreState(), MediaStore.mutation);
    }   

    static mutation(state: MediaStoreState, message: Message): MediaStoreState {
        return state;
    }
}