import fetch from "@/utils/fetch";
export function GetRegions() {
    return fetch({
      url: "Region/GetRegions",
      method: "GET"
    }).then(function(response) {
      return response;
    });
  }