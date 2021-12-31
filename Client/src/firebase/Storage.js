import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { setPhotoUrl } from "./auth";
import { app } from "./config";

const storage = getStorage(app);

export async function storeImage(image, folder, displayName, id) {
  var ImageUrl = "";

  const imageRef = ref(
    storage,
    folder + displayName?.replace(" ", "_") + "_" + id + "." + image.name.split(".").pop()
  );
  await uploadBytesResumable(imageRef, image)
    .then(async (snapshot) => {
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

export const StoreUserProfilePhoto = async (id, displayName, image) => {
  const imageRef = ref(
    storage,
    "profil/" + displayName?.replace(" ", "_") + "_" + id + "." + image.name.split(".").pop()
  );
  var imageUrl = "";

  await uploadBytesResumable(imageRef, image)
    .then(async (snapshot) => {
      console.log(`snapshot`, snapshot);
      await getDownloadURL(snapshot.ref).then((url) => (imageUrl = url));
      console.log(`imageUrl`, imageUrl);
      await setPhotoUrl(imageUrl);
    })
    .catch(() => console.log("erreur lors de l'ajout"));
};
