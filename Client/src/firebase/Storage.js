import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { app } from "./config";

const storage = getStorage(app);

export async function storeImage(image, folder) {
  var ImageUrl = "";
  const imageRef = ref(storage, folder + "/" + image.name);
  await uploadBytesResumable(imageRef, image)
    .then(async (snapshot) => {
      console.log(`snapshot`, snapshot);
      await getDownloadURL(snapshot.ref)
        .then((url) => {
          console.log(`url`, url);
          ImageUrl = url;
        })
        .catch(() => console.log("erreur while retrieving url"));
    })
    .catch(() => console.log("erreur lors de l'enregistrement"));
  return ImageUrl;
}
