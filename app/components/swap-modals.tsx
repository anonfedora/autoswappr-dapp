"use client";
import { type Token, tokenAddresses, tokenImages } from "@/constants/tokens";
import { TimePassed } from "@/svgs/TimePassedIcon";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  from: boolean;
  handleClose: () => void;
  onTokenSelect: (token: Token) => void;
}

const ModalHeader = ({
  handleClose,
  from,
}: {
  handleClose: () => void;
  from: boolean;
}) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex gap-[.5rem] items-center">
      <p className="text-[#4C5053] text-[13px] font-[400]">Select a token</p>
      <div className="w-[1px] h-[10px] bg-[#1E2021]" />
      <p className="text-sm md:text-base font-[400] text-[#F3F5FF]">
        Swap {from ? "From" : "To"}
      </p>
    </div>
    <X onClick={handleClose} className="cursor-pointer" />
  </div>
);

const SearchToken = ({
  searchTokens,
}: {
  searchTokens: (e: Token) => void;
}) => (
  <div
    className={`flex w-full py-[12px] px-[16px] bg-[#0D1016] justify-between items-center
    rounded-[8px] focus-within:outline-1 mb-3`}
  >
    <label htmlFor="search-token" className="sr-only" />
    <input
      type="search"
      id="search-token"
      placeholder="Search token"
      onChange={(e) => searchTokens(e.target.value as Token)}
      className="grow-[2] border-none focus:outline-none bg-transparent placeholder:text-[#7E8489] text-[#f9f9f9] text-base font-[400]"
    />
    <Search className="text-[#7E8489] w-[15px] h-[15px]" />
  </div>
);

const RecentToken = ({
  onTokenSelect,
  handleClose,
}: {
  onTokenSelect: (token: Token) => void;
  handleClose: () => void;
}) => {
  return (
    <div className="w-full pb-6 border-b border-b-[#1E2021]">
      <div className="flex gap-1 items-center justify-start text-sm mb-4">
        <TimePassed />
        <span>Recent searches</span>
      </div>
      <div className="mt-4 w-full grid grid-cols-2 items-center md:gap-4 gap-2 justify-between">
        <TokenCard
          token={"STRK"}
          label="Starknet"
          onTokenSelect={onTokenSelect}
          handleClose={handleClose}
          recent={true}
        />
        <TokenCard
          token={"ETH"}
          label="Ethereum"
          onTokenSelect={onTokenSelect}
          handleClose={handleClose}
          recent={true}
        />
        <TokenCard
          token={"BTC"}
          label="Bitcoin"
          onTokenSelect={onTokenSelect}
          handleClose={handleClose}
          recent={true}
        />
        <TokenCard
          token={"USDT"}
          label="Tether"
          onTokenSelect={onTokenSelect}
          handleClose={handleClose}
          recent={true}
        />
      </div>
    </div>
  );
};

const Tokens = ({
  handleClose,
  onTokenSelect,
  tokens,
}: {
  handleClose: () => void;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}) => {
  return (
    <div className="w-full">
      <p className="mb-2 md:mb-4">Tokens</p>
      <div className="flex flex-col items-center justify-start gap-3 md:gap-5 w-full overflow-auto scrollbar-hide h-[180px] md:h-[240px]">
        {tokens.map((token) => (
          <TokenCard
            key={token}
            label={token}
            token={token}
            onTokenSelect={onTokenSelect}
            handleClose={handleClose}
            recent={false}
          />
        ))}
      </div>
    </div>
  );
};

const TokenCard = ({
  token,
  label,
  onTokenSelect,
  handleClose,
  recent,
}: {
  token: Token;
  label: string;
  onTokenSelect?: (token: Token) => void;
  handleClose: () => void;
  recent: boolean;
}) => {
  const handleSelect = (token: string) => {
    onTokenSelect!(token as Token);
    return handleClose();
  };

  return (
    <button
      type="button"
      onClick={() => handleSelect(token)}
      className={`flex gap-2 cursor-pointer py-1 border ${recent ? "border-[#1E2021]" : "border-transparent hover:border-none border-none"} md:hover:border-[#1E2021] transition-all ease-out duration-300 px-3 rounded-[8px]  w-full text-sm md:text-base items-center outline-none`}
    >
      <img src={tokenImages[token]} alt="" className="w-6 h-6 md:w-8 md:h-8" />
      <div className="text-start">
        <p>{label}</p>
        <p className="text-xs text-[#424242]">{token}</p>
      </div>
    </button>
  );
};

// Swap To Modal

export function SwapTo({ handleClose, onTokenSelect }: ModalProps) {
  const [tokens, setTokens] = useState<Token[]>(
    Object.keys(tokenAddresses) as Array<Token>
  );

  const searchTokens = (search: Token) => {
    const tokens = Object.keys(tokenAddresses) as Array<Token>;
    setTokens(tokens.filter((token) => token.toLowerCase().includes(search)));
  };

  return (
    <div
      className={`flex flex-col gap-3 md:gap-6 rounded-[8px] bg-[#000103] border-[1px] border-[#1E2021] px-[20px] py-[24px] text-[#F9F9F9] h-fit
      w-[24rem] sm:w-[480px] items-start no-scrollbar overflow-y-auto mt-8 sm:mt-24 mx-2`}
      onClick={(e) => e.stopPropagation()}
    >
      <ModalHeader handleClose={handleClose} from={false} />
      <p className="w-full text-xs md:text-sm font-[400] text-[#BABFC3]">
        You can select multiple tokens to auto-swap from
      </p>
      <SearchToken searchTokens={searchTokens} />
      <RecentToken onTokenSelect={onTokenSelect} handleClose={handleClose} />
      <Tokens
        onTokenSelect={onTokenSelect}
        handleClose={handleClose}
        tokens={tokens}
      />
    </div>
  );
}

/**
    Swap From Modal
*/
export function SwapFrom({ handleClose, onTokenSelect }: ModalProps) {
  const [tokens, setTokens] = useState<Token[]>(
    Object.keys(tokenAddresses) as Array<Token>
  );

  const searchTokens = (search: Token) => {
    const tokens = Object.keys(tokenAddresses) as Array<Token>;
    setTokens(tokens.filter((token) => token.toLowerCase().includes(search)));
  };

  return (
    <div
      className={`flex flex-col gap-6 rounded-[8px] bg-[#000103] border-[1px] border-[#1E2021] px-[20px] py-[24px] text-[#F9F9F9] h-fit
      w-[24rem] sm:w-[480px] items-start no-scrollbar overflow-y-auto mt-8 sm:mt-24 mx-2`}
      onClick={(e) => e.stopPropagation()}
    >
      <ModalHeader handleClose={handleClose} from />
      <p className="w-full text-[14px] font-[400] py-2 text-[#BABFC3]">
        You can select multiple tokens to auto-swap from
      </p>
      <SearchToken searchTokens={searchTokens} />
      <RecentToken onTokenSelect={onTokenSelect} handleClose={handleClose} />
      <Tokens
        onTokenSelect={onTokenSelect}
        handleClose={handleClose}
        tokens={tokens}
      />
    </div>
  );
}
