
import { useState, useEffect, useMemo } from 'react';
import { motion } from "framer-motion";
import ScrollAnimation from '@components/ui/ScrollAnimation';
import ScrollAnimationWrapper from '@components/ui/ScrollAnimationWrapper';
import * as btn from '@components/input/Button';
import { getDateTime } from '@utils/functions';
import styled from '@emotion/styled';
export default function EventPrizeContainer({eventPrizes}) {

  return (<>
  <section className="relative">
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      </section>
  </>)
}