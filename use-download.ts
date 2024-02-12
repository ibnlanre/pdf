import { useCallback } from "react";

interface UseDownloadProps {
  onError?: (error: any) => void;
  title: string;
  url: string;
}

export function useDownload(data: UseDownloadProps) {
  const filename = `${data.title}.pdf`;

  const download = useCallback(() => {
    let tempLink = document.createElement("a"),
      blobURL: string;

    fetch(data.url)
      .then((response) => response.blob())
      .then((blob) => {
        blobURL = window.URL.createObjectURL(blob);

        tempLink.style.display = "none";
        tempLink.href = blobURL;

        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }

        document.body.appendChild(tempLink);
        tempLink.click();
      })
      .catch(data.onError)
      .finally(() => {
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
      });
  }, []);

  return download;
}
