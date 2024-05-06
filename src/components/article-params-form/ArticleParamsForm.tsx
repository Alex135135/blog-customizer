import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { SyntheticEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Text } from '../text';

type ArticleParamsFormProps = {
	setState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setState }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	const [formData, setFormData] = useState(defaultArticleState);

	const handleButtonClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onClose: () => setIsMenuOpen(false),
		onChange: (newValue: boolean) => setIsMenuOpen(newValue),
	});

	const handleChange = (type: keyof typeof formData, value: OptionType) => {
		setFormData((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setState(formData);
	};

	const handleReset = () => {
		setFormData(defaultArticleState);
		setState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={handleButtonClick} isOpen={isMenuOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} align='left'>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formData.fontFamilyOption}
						title='шрифт'
						placeholder={
							formData.fontFamilyOption ? formData.fontFamilyOption.title : ''
						}
						onChange={(font) => handleChange('fontFamilyOption', font)}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formData.fontSizeOption}
						onChange={(fontSize) => handleChange('fontSizeOption', fontSize)}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formData.fontColor}
						title='цвет шрифта'
						placeholder={formData.fontColor ? formData.fontColor.title : ''}
						onChange={(fontColor) => handleChange('fontColor', fontColor)}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formData.backgroundColor}
						title='цвет фона'
						placeholder={
							formData.backgroundColor ? formData.backgroundColor.title : ''
						}
						onChange={(backgroundColor) =>
							handleChange('backgroundColor', backgroundColor)
						}
					/>
					<Select
						options={contentWidthArr}
						selected={formData.contentWidth}
						title='цвет фона'
						placeholder={
							formData.contentWidth ? formData.contentWidth.title : ''
						}
						onChange={(contentWidth) =>
							handleChange('contentWidth', contentWidth)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
