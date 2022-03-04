export interface ILinkLikeComponentProps
  extends React.HTMLProps<HTMLAnchorElement> {
  /** 연결할 URL */
  url?: string;
  /**	링크 안에 표시할 내용 */
  children?: React.ReactNode;
  /** 링크를 새 탭에서 열기 여부 */
  external?: boolean;
  /** 브라우저가 URL을 여는 대신 다운로드하도록 지시합니다. 문자열 값인 경우 다운로드한 파일 이름에 대한 힌트를 제공합니다. */
  download?: string | boolean;
  [key: string]: any;
}
