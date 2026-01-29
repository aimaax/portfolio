import type { ReactElement } from "react";

type PdfBookViewerProps = {
  pdfPath: string;
};

/**
 * Project PDF viewer: same layout as CV, with toolbar visible for page navigation.
 */
export const PdfBookViewer = ({ pdfPath }: PdfBookViewerProps): ReactElement => (
  <div className="project-pdf__container">
    <iframe
      className="project-pdf__iframe"
      src={`${pdfPath}#view=FitH`}
      title="Project PDF"
    />
  </div>
);