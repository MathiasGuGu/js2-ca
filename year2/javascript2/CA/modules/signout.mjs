export default function signOut() {
  localStorage.clear();
  window.location.replace("/");
}
