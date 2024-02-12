/* eslint-disable @typescript-eslint/no-unused-vars */
// ts-worksheet

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useReducer,
  forwardRef,
  memo,
} from "react";

import type { ChangeEvent, Ref, SVGProps } from "react";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ViewerProps {
  url: string;
  numPages: number;
  renderInteractiveForms?: boolean;
  renderAnnotationLayer?: boolean;
  renderTextLayer?: boolean;
  documentLoadComponent?: JSX.Element;
  pageLoadComponent?: JSX.Element;
  loading: boolean;
  handleLoading: (loading: boolean) => void;
  handleNumPages: (numPages: number) => void;
  handlePageDimensions: (page: { width: number; height: number }) => void;
  handleActivePage: (pageNumber: number) => void;
  node: HTMLDivElement | null;
  activePage: number;
}

const ViewerRef = (props: ViewerProps) => {
  const {
    url,
    numPages = 1,
    renderInteractiveForms = false,
    renderAnnotationLayer = false,
    renderTextLayer = false,
    handleNumPages,
    handlePageDimensions,
    handleActivePage,
    handleLoading,
    activePage,
    node,
  } = props;

  const pages = useMemo(() => {
    return new Array(numPages).fill(0).map((_, i) => {
      const pageNumber = i + 1;
      return (
        <Page
          loading={""}
          pageNumber={pageNumber}
          renderAnnotationLayer={renderAnnotationLayer}
          renderTextLayer={renderTextLayer}
          key={`page_${pageNumber}`}
        />
      );
    });
  }, [numPages]);

  return (
    <Document
      file={url}
      onLoadSuccess={async ({ numPages, _transport }) => {
        try {
          handleNumPages(numPages);
          const page = await _transport.getPage(1);

          const [top, bottom, width, height] = page.view;
          handlePageDimensions({ width, height });
          handleLoading(false);

          const options = {
            root: node,
            rootMargin: "0px",
            threshold: 0.45,
          };

          const watcher = ({
            isIntersecting,
            target,
          }: IntersectionObserverEntry) => {
            if (isIntersecting) {
              handleLoading(true);
              const { dataset } = target as HTMLDivElement;
              const fallback = activePage.toString();
              handleActivePage(parseInt(dataset.pageNumber ?? fallback));
            }
          };

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(watcher);
          }, options);

          const targets = document.querySelectorAll("[data-page-number]");
          for (const target of targets) observer.observe(target);
        } catch (e) {
          console.error("Error loading document", e);
        }
      }}
    >
      {pages}
    </Document>
  );
};

ViewerRef.displayName = "Viewer";
export const Viewer = memo(ViewerRef);
