"use client"

import React from "react";
import { I18nProvider, TimeValue } from "react-aria";
import { TimeFieldStateOptions } from "react-stately";
import { TimeField } from "./time-field";

const TimePicker = React.forwardRef<
  HTMLDivElement,
  Omit<TimeFieldStateOptions<TimeValue>, "locale">
>((props, forwardedRef) => {
  return (
    <I18nProvider locale="tr-TR">
      <TimeField {...props} />
    </I18nProvider>
  );
});

TimePicker.displayName = "TimePicker";

export { TimePicker };