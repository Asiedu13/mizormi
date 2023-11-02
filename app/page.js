export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 tracking-wider">
      <header className="w-[300px] sm:w-fit flex flex-col justify-between items-center lg:flex-row lg:w-fit">
        <h2 className="text-5xl md:text-8xl lg:px-[20px] ">Mizormi API</h2>
        <section>
          <p className="text-center w-[300px] sm:w-fit sm:text-left text-sm tracking-wider">
            Project developed by{" "}
            <a
              className="text-[orange]"
              href="https://www.linkedin.com/in/todd-nelson-71436022a"
            >
              Todd Nelson
            </a>{" "}
            and{" "}
            <a
              className="text-[orange]"
              href="https://www.linkedin.com/in/princek-asiedu/"
            >
              Prince Asiedu
            </a>
          </p>
          <section className="mt-[10px] flex justify-evenly items-center">
            <a
              href="https://github.com/Asiedu13/mizormi"
              className="flex text-sm justify-between items-center w-[120px] relative"
            >
              <p>Goto project</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#ffffff"
                className="animate-bounceHorizontally"
              >
                <path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z" />
              </svg>
            </a>
          </section>
        </section>
      </header>

      <section className="lg:relative lg:left-[5px]">
        <p className="text-sm tracking-[.2rem]">&copy;Copyright 2023</p>
      </section>
    </main>
  );
}
