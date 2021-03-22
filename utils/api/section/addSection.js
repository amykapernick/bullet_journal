import {
	gql
} from '@apollo/client';

const ADD_SECTION = gql`
	mutation AddSection(
		$section: SectionInput!
	) {
		addSection(section: $section) {
			sectionId
		}
	}
`

export default ADD_SECTION