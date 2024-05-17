"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";

const UploadAudio = ({
  onSubmit,
}: {
  onSubmit: (val: {
    policyNumber: string;
    file: File | undefined;
  }) => void | Promise<void>;
}) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      policyNumber: "",
      file: undefined,
    },
    onSubmit: onSubmit,
  });
  return (
    <div>
      <h3>Upload Audio</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="policy-number-textfield">Policy Number</Label>
          <Input
            id="policy-number-textfield"
            type="text"
            name="policyNumber"
            onChange={handleChange}
            value={values.policyNumber}
          />
        </div>

        <div>
          <Label htmlFor="file-upload-field">File</Label>
          <Input
            id="file-upload-field"
            type="file"
            name="file"
            onChange={handleChange}
            value={values.file}
          />
        </div>

        {/* <pre>
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre> */}
        <DialogFooter className="mt-3">
          <Button variant={"default"} type="submit">
            Upload
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default UploadAudio;
