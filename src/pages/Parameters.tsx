import { useState } from "react";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { BudgetItems } from "../components/Parameters/BudgetItems";
import { Supplier } from "../components/Parameters/Supplier";

type activeParameterPage = 'supplier' | 'budget-item' | null

const Parameters = () => {
    const [activePage, setActivePage] = useState<activeParameterPage>(null)

    const showActivePage = 
        (activePage === 'supplier') ? <Supplier /> : 
        (activePage === 'budget-item') ? <BudgetItems /> : 
        <div className="mt-5">
			<div className='flex justify-center'>
				<div className='container w-2/3'>
					<img
						className='w-full rounded-lg shadow-2xl'
						src='/images/parameters-background.jpg'
						alt='main page'
					/>
				</div>
			</div>
        </div>

    return (
        <section className='grid grid-cols-12 text-indigo-800 px-5 min-h-96 space-x-6 mb-5'>
            <article  className='col-span-9'>
                {showActivePage}
            </article>
            <aside className='col-span-3 my-3 text-right flex flex-col'>
                <PrimaryButton buttonType={'button'} text={"Supplier"} onEvent={() => {setActivePage('supplier')}} />
                <PrimaryButton buttonType={'button'} text={"Budget Items"} onEvent={() => {setActivePage('budget-item')}} />
                <PrimaryButton buttonType={'button'} text={"Parameters Home"} onEvent={() => {setActivePage(null)}} />
            </aside>
        </section>
    )
}

export { Parameters }