import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function FieldDemo() {
  return (
    <div className="flex flex-row justify-center items-center h-dvh p-5">
      <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Login</FieldLegend>
            <FieldDescription>
              Don't have an account? 
              <Link href="/signup">Sign Up</Link>
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="user@gmail.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
                <FieldDescription>
                  Enter your password!!
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit" formAction={"api/user"} formMethod="get">Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
    </div>
  )
}
