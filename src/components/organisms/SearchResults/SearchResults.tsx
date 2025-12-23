import Content from "@/components/atoms/Content";
import { memo } from "react";

const SearchResults = memo(({ value }: { value: string }) => {
    const searchArray = Array.from({ length: Math.floor(Math.random() * 15) }, () => value)

    return (
        <div className="w-1/2">
            <h1 className="my-4 text-xl truncate">По запросу {value + ' найдено ' + searchArray.length} совпадений:</h1>
            {searchArray.map((item, index) => (
                <Content key={index} className="min-w-1/2 mb-4">
                    <p className="truncate max-w-[550px]"> Элемент с {item}</p>
                </Content>
            ))}
        </div>
    );
});

export default SearchResults;