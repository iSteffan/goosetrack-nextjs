import { AuthForm } from '@/components/AuthForm/AuthForm';

export default function Page() {
  return (
    <section className="bg-blueLight py-[155px]">
      <div className="container">
        <AuthForm type="signUp" />
      </div>
    </section>
  );
}
