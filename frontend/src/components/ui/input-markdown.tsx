import "@mdxeditor/editor/style.css";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { Control } from "react-hook-form";
import { MDXEditor, MDXEditorMethods } from "@mdxeditor/editor/MDXEditor";
import { UndoRedo } from "@mdxeditor/editor/plugins/toolbar/components/UndoRedo";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { useRef, useState } from "react";

interface InputMarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
}

const InputMarkdown = ({
  control,
  placeholder,
  fieldName,
}: InputMarkdownProps) => {
  const ref = useRef<MDXEditorMethods>(null);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        console.log(field.value)
        return (
          <FormItem>
            <FormControl>
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {placeholder}
                </label>
                <MDXEditor
                  ref={ref}
                  markdown={field.value}
                  onChange={field.onChange}
                  className="dark-theme dark-editor border rounded text-left"
                  plugins={[
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          {" "}
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                        </>
                      ),
                    }),
                  ]}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputMarkdown;
