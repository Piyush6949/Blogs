'use client'

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

async function signup(){
  
}

export default function FieldDemo() {
  return (
    <div className="flex flex-row justify-center items-center h-dvh p-5">
      <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Singup</FieldLegend>
            <FieldDescription>
              Have an account? 
              <Link href="/signin">Login</Link>
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">
                  Username
                </FieldLabel>
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  required
                />
              </Field>
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
                  Create a strong password!!
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit" formAction={"/api/user"} formMethod="post">Signup</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
    </div>
  )
}
