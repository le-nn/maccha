import { MediaRepositry } from "Apps/Repositories/MediaRepository";
import { Message, State, Store, store } from "relux.js";

class MediaStoreState extends State<MediaStoreState> {

}

@store({ name: "MediaStore" })
export class MediaStore extends Store<MediaStoreState> {
    constructor(
        private readonly repository: MediaRepositry
    ) {
        super(new MediaStoreState(), MediaStore.mutation);
    }   

    static mutation(state: MediaStoreState, message: Message): MediaStoreState {
        return state;
    }
}