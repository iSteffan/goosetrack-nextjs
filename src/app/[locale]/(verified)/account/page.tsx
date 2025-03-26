import { UserForm } from '@/components/common/UserForm/UserForm';

export default function Page() {
  return (
    <section className="min-h-screen bg-grayBg pb-[40px] pt-[95px] dark:bg-blackPageBg md:pt-[40px] xl:pt-[9px]">
      <div className="container xl:px-[32px]">
        <UserForm />
      </div>
    </section>
  );
}
