export function safeCalculate(expression: string): string {
  const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
  
  if (!sanitized || /^[\+\*/]/.test(sanitized) || /[\+\*/]$/.test(sanitized)) {
    return 'Error';
  }

  try {
    const result = Function(`"use strict"; return (${sanitized})`)();
    
    if (!isFinite(result) || isNaN(result)) {
      return 'Error';
    }
    
    return Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
  } catch {
    return 'Error';
  }
}