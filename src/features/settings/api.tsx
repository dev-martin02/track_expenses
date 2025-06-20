const backendUrl = "http://localhost:3000/";

export function deleteAccount() {
  return fetch(`${backendUrl}users/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
