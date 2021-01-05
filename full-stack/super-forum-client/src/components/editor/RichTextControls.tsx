import React, { PropsWithChildren, MutableRefObject } from "react";
import ReactDOM from "react-dom";
import { ClassNames, css } from "@emotion/react";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref:
      | MutableRefObject<HTMLSpanElement | null>
      | ((instance: HTMLSpanElement | null) => void)
      | null
  ) => (
    <ClassNames>
      {({ css, cx }) => (
        <span
          {...props}
          ref={ref}
          className={cx(
            className,
            css`
              cursor: pointer;
              color: ${reversed
                ? active
                  ? "white"
                  : "#aaa"
                : active
                ? "black"
                : "#aaa"};
            `
          )}
        />
      )}
    </ClassNames>
  )
);

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any;
      } & BaseProps
    >,
    ref:
      | MutableRefObject<HTMLDivElement | null>
      | ((instance: HTMLDivElement | null) => void)
      | null
  ) => {
    const textLines = value.document.nodes
      .map((node: any) => node.text)
      .toArray()
      .join("\n");
    return (
      <ClassNames>
        {({ css, cx }) => (
          <div
            ref={ref}
            {...props}
            className={cx(
              className,
              css`
                margin: 30px -20px 0;
              `
            )}
          >
            <div
              className={css`
                font-size: 14px;
                padding: 5px 20px;
                color: #404040;
                border-top: 2px solid #eeeeee;
                background: #f8f8f8;
              `}
            >
              Slate's value as text
            </div>
            <div
              className={css`
                color: #404040;
                font: 12px monospace;
                white-space: pre-wrap;
                padding: 10px 20px;
                div {
                  margin: 0 0 0.5em;
                }
              `}
            >
              {textLines}
            </div>
          </div>
        )}
      </ClassNames>
    );
  }
);

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref:
      | MutableRefObject<HTMLDivElement | null>
      | ((instance: HTMLDivElement | null) => void)
      | null
  ) => (
    <ClassNames>
      {({ css, cx }) => (
        <div
          {...props}
          ref={ref}
          className={cx(
            className,
            css`
              white-space: pre-wrap;
              margin: 0 -20px 10px;
              padding: 10px 20px;
              font-size: 14px;
              background: #f8f8e8;
            `
          )}
        />
      )}
    </ClassNames>
  )
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref:
      | MutableRefObject<HTMLDivElement | null>
      | ((instance: HTMLDivElement | null) => void)
      | null
  ) => (
    <ClassNames>
      {({ css, cx }) => (
        <div
          {...props}
          ref={ref}
          className={cx(
            className,
            css`
              & > * {
                display: inline-block;
              }

              & > * + * {
                margin-left: 15px;
              }
            `
          )}
        />
      )}
    </ClassNames>
  )
);

export const Portal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref:
      | MutableRefObject<HTMLDivElement | null>
      | ((instance: HTMLDivElement | null) => void)
      | null
  ) => (
    <ClassNames>
      {({ css, cx }) => (
        <Menu
          {...props}
          ref={ref}
          className={cx(
            className,
            css`
              position: relative;
              padding: 1px 18px 17px;
              margin: 0 -20px;
              border-bottom: 2px solid #eee;
              margin-bottom: 20px;
            `
          )}
        />
      )}
    </ClassNames>
  )
);
