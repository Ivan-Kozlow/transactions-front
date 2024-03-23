import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const COLORS = ['#b30808', '#0b8f3b']

interface IProps {
	totalExpense: number
	totalIncome: number
}
interface IData {
	value: number
	name: string
}

const Chart: React.FC<IProps> = ({ totalExpense, totalIncome }) => {
	const data = new Array<IData>({ value: totalExpense, name: 'Expense' }, { value: totalIncome, name: 'Income' })

	return (
		<PieChart width={240} height={240} className='mt-2 mx-auto'>
			<Pie
				data={data}
				cx={'50%'}
				cy={'50%'}
				innerRadius={60}
				outerRadius={80}
				fill='#8884d8'
				paddingAngle={2}
				dataKey='value'
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Legend />
			<Tooltip />
		</PieChart>
	)
}

export default Chart
